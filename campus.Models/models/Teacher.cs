namespace Models;

public class Teacher : Entity
{
    public Guid Id { get; init; }
    public string FullName { get; private set; } = string.Empty;
}
