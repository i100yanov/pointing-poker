using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Poker.Model.User
{
    [DataContract]
    public class CreateModel : UserModel
    {
        [DataMember(Name = "password", IsRequired = true)]
        [Required]
        public string Password { get; set; }
    }
}