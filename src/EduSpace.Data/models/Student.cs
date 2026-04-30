
namespace EduSpace.Data.models;

public class Student : AppUser
{
    public string StudentTicketNumber { get; set; } = string.Empty;
    public int GroupId { get; set; }
    public Group? Group { get; set; }
}