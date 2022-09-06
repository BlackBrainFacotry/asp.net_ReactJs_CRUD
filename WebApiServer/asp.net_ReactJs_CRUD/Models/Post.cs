using System.ComponentModel.DataAnnotations;

namespace asp.net_ReactJs_CRUD.Models
{
    public class Post
    {
        [Key]
        public int PostId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000000)]
        public string Content { get; set; } = string.Empty;
    }
}
