using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Poker.Domain.Entities.Interfaces;
using Poker.Domain.Factories.Interfaces;
using Poker.Model.User;
using Poker.Service.Interfaces;
using Poker.Transportation.Repository.Base.Interfaces;

namespace Poker.Service
{
    public class UserService : IUserService
    {
        #region -- private readonly fields --

        private readonly IUnitOfWork _unitOfWork;

        private readonly IUserFactory _userFactory;

        #endregion

        #region -- constructor --

        public UserService(IUnitOfWork unitOfWork, IUserFactory userFactory)
        {
            _unitOfWork = unitOfWork;

            _userFactory = userFactory;
        }

        #endregion

        #region -- public methods --

        public UserModel Get(string username)
        {
            IUser user = _userFactory.Get(username);

            if (user == null)
            {
                return null;
            }

            UserModel result = new UserModel
            {
                Username = user.Username,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Email = user.Email
            };

            return result;
        }

        public IList<UserModel> GetAll()
        {
            return _userFactory.GetAll().Select(
                user => new UserModel
                            {
                                Username = user.Username,
                                Firstname = user.Firstname,
                                Lastname = user.Lastname,
                                Email = user.Email
                            }).ToList();

        }

        public IList<ValidationError> Register(CreateModel model)
        {
            IList<ValidationError> result;

            result = Validate(model, true);

            using (IGenericTransaction transaction = _unitOfWork.CreateTransaction())
            {
                if (result.Count > 0)
                {
                    transaction.Commit();

                    return result;
                }

                IUser user = _userFactory.New(model.Username.Trim(), model.Password.Trim());

                user.Firstname = model.Firstname.Trim();
                user.Lastname = model.Lastname.Trim();
                user.Email = model.Email.Trim();

                try
                {
                    user.Save();

                    transaction.Commit();
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    throw;
                }
            }

            return result;
        }

        public IList<ValidationError> Validate(CreateModel model, bool checkUsernameExists)
        {
            List<ValidationError> result = new List<ValidationError>();
            ValidationError? usernameResult = ValidateUsername(model, checkUsernameExists);
            if (usernameResult.HasValue)
            {
                result.Add(usernameResult.Value);
            }

            ValidationError? passwordResult = ValidatePassword(model);
            if (passwordResult.HasValue)
            {
                result.Add(passwordResult.Value);
            }

            ValidationError? firstnameResult = ValidateFirstname(model);
            if (firstnameResult.HasValue)
            {
                result.Add(firstnameResult.Value);
            }

            ValidationError? lastnameResult = ValidateLastname(model);
            if (lastnameResult.HasValue)
            {
                result.Add(lastnameResult.Value);
            }

            ValidationError? emailResult = ValidateEmail(model);
            if (emailResult.HasValue)
            {
                result.Add(emailResult.Value);
            }

            return result;
        }

        public ValidationError? ValidateUsername(CreateModel model, bool checkUsernameExists)
        {
            if (string.IsNullOrWhiteSpace(model.Username))
            {
                return ValidationError.UsernameMissing;
            }

            string username = model.Username.Trim();
            if (username.Length > 100)
            {
                return ValidationError.UsernameToLong;
            }

            if (checkUsernameExists)
            {
                IUser user = _userFactory.Get(username);

                if (user != null)
                {
                    return ValidationError.UsernameExists;
                }
            }

            return null;
        }

        public ValidationError? ValidatePassword(CreateModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Password))
            {
                return ValidationError.PasswordMissing;
            }

            string password = model.Password.Trim();
            if (password.Length > 100)
            {
                return ValidationError.PasswordToLong;
            }

            return null;
        }

        public ValidationError? ValidateFirstname(CreateModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Firstname))
            {
                return ValidationError.FirstnameMissing;
            }

            string firstname = model.Firstname.Trim();
            if (firstname.Length > 100)
            {
                return ValidationError.FirstnameToLong;
            }

            return null;
        }

        public ValidationError? ValidateLastname(CreateModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Lastname))
            {
                return ValidationError.LastnameMissing;
            }

            string lastname = model.Lastname.Trim();
            if (lastname.Length > 100)
            {
                return ValidationError.LastnameToLong;
            }

            return null;
        }

        public ValidationError? ValidateEmail(CreateModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Email))
            {
                return ValidationError.EmailMissing;
            }

            string email = model.Email.Trim();
            if (email.Length > 250)
            {
                return ValidationError.EmailToLong;
            }

            string pattern = @"^[\w!#$%&'*+\-/=?\^_`{|}~]+(\.[\w!#$%&'*+\-/=?\^_`{|}~]+)*" // local-part
                           + "@"
                           + @"((([\w]+([-\w]*[\w]+)*\.)+[a-zA-Z]+)|" // domain
                           + @"((([01]?[0-9]{1,2}|2[0-4][0-9]|25[0-5]).){3}[01]?[0-9]{1,2}|2[0-4][0-9]|25[0-5]))\z"; // or IP Address

            Regex regex = new Regex(pattern);
            Match match = regex.Match(email);
            if (!match.Success)
            {
                return ValidationError.EmailWrongFormat;
            }

            return null;
        }

        #endregion
    }
}