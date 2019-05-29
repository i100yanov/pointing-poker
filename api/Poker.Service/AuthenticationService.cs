using System.Collections.Generic;
using Poker.Domain.Entities.Interfaces;
using Poker.Domain.Factories.Interfaces;
using Poker.Service.Interfaces;
using Poker.Transportation.Repository.Base.Interfaces;

namespace Poker.Service
{
    public class AuthenticationService : IAuthenticationService
    {
        #region -- private readonly fields --

        private readonly Dictionary<string, string> activeUserTokens = new Dictionary<string, string>(System.StringComparer.OrdinalIgnoreCase);
        private readonly IUnitOfWork _unitOfWork;

        private readonly IUserFactory _userFactory;

        #endregion

        #region -- constructor --

        public AuthenticationService(IUnitOfWork unitOfWork, IUserFactory userFactory)
        {
            _unitOfWork = unitOfWork;

            _userFactory = userFactory;
        }

        #endregion

        #region -- public methods --

        public string Authenticate(string username, string password)
        {
            IUser user = _userFactory.Get(username);

            bool valid =  user != null && user.CheckPassword(password);
            string authToken = null;
            if (valid)
            {
                if (!activeUserTokens.ContainsKey(username))
                {
                    authToken = System.Guid.NewGuid().ToString("D");
                    activeUserTokens.Add(username, authToken);
                }
                else
                {
                    authToken = activeUserTokens[username];
                }
            }

            return authToken;
        }

        #endregion
    }
}