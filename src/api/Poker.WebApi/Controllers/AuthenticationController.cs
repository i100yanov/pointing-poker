using System;
using Microsoft.AspNetCore.Mvc;
using Poker.Model.User;
using Poker.Service.Interfaces;

namespace Poker.WebUI.Controllers
{
    [Produces("application/json")]
    [Route("authentication")]
    public class AuthenticationController : Controller
    {
        #region -- private readonly fields --

        private readonly IAuthenticationService _authenticationService;
        private readonly IUserService _userService;

        #endregion

        #region -- constructor --

        public AuthenticationController(IAuthenticationService authenticationService, 
                                        IUserService userService)
        {
            _authenticationService = authenticationService;
            _userService = userService;
        }

        #endregion

        [HttpGet("login")]
        public ActionResult Login(string email,string password)
        {
            try
            {
/*
                if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                {
                    return StatusCode(401);
                }
*/
                bool result = _authenticationService.Authenticate(email.Trim(), password.Trim());

                if (!result)
                {
                    return BadRequest();
                }

                UserModel model = _userService.Get(email.Trim());

                return Ok(model);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}