namespace EduSpace.Data.models;

public class Teacher : AppUser
{
    public string Department { get; set; } = string.Empty;
    public string ScientificDegree { get; set; } = string.Empty;
}