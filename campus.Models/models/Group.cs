using Models;

public class Group
{
    private List<Student> Students { get; set; }
    private List<Teacher> Teachers { get; set; }
    public string Name { get; init; } = string.Empty;
}