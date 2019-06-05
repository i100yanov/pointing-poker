using System.Collections.Generic;
using Poker.Model.User;

namespace Poker.Service.Interfaces
{
    public interface IUserService
    {
        UserModel Get(string username);

        IList<ValidationError> Register(CreateModel model);

        IList<ValidationError> Validate(CreateModel model, bool checkUsernameExists);

        ValidationError? ValidateUsername(CreateModel model, bool checkUsernameExists);

        ValidationError? ValidatePassword(CreateModel model);

        ValidationError? ValidateFirstname(CreateModel model);

        ValidationError? ValidateLastname(CreateModel model);

        ValidationError? ValidateEmail(CreateModel model);
    }
}