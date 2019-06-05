using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Poker.Model.User
{
    [DataContract]
    public class UserModel
    {
        [DataMember(Name = "username", IsRequired = true)]
        public string Username { get; set; }

        [DataMember(Name = "email", IsRequired = true)]
        public string Email { get; set; }

        [DataMember(Name = "firstname")]
        public string Firstname { get; set; }

        [DataMember(Name = "lastname")]
        public string Lastname { get; set; }

        [DataMember(Name = "token")]
        public string Token { get; set; }

    }
}