﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Poker.WebApi.RestModels
{
    [DataContract]
    public class LoginData
    {
        [DataMember(Name = "username", IsRequired = true)]
        [Required]
        public string Username { get; set; }

        [DataMember(Name = "password", IsRequired = true)]
        [Required]
        public string Password { get; set; }
    }
}
