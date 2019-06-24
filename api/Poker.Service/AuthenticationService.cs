using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using Microsoft.IdentityModel.Tokens;

using Poker.Domain.Entities.Interfaces;
using Poker.Domain.Factories.Interfaces;
using Poker.Service.Interfaces;
using Poker.Transportation.Repository.Base.Interfaces;

namespace Poker.Service
{
    public class AuthenticationService : IAuthenticationService
    {
        #region -- private readonly fields --
        private readonly IUserFactory _userFactory;

        #endregion

        #region -- constructor --

        public AuthenticationService(IUnitOfWork unitOfWork, IUserFactory userFactory)
        {
            _userFactory = userFactory;
        }

        #endregion

        #region -- public methods --

        public string Authenticate(string username, string password, string secret)
        {
            IUser user = _userFactory.Get(username);

            bool valid =  user != null && user.CheckPassword(password);

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);
            var tokenDescriptor = new SecurityTokenDescriptor
                                      {
                                          Subject = new ClaimsIdentity(new Claim[]
                                                                           {
                                                                               new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                                                                               new Claim(ClaimTypes.Name, user.Username)
                                                                           }),
                                          Expires = DateTime.UtcNow.AddDays(7),
                                          SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                                      };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            string tokenString =  tokenHandler.WriteToken(token);

            return tokenString;
        }

        #endregion
    }
}