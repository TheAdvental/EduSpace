namespace Models;

public class Student : Entity
{
    public Guid Id { get; init; }
    public string FullName { get; private set; }

}