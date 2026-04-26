using Models;
using Models.interfaces;

public class Group : Entity
{
    public Guid Id { get; init; }
    public List<Student> Students { get; private set; }
    public List<Teacher> Teachers { get; private set; }
    public string FullName { get; init; } = string.Empty;
    public Faculties Faculty { get; init; }

}
