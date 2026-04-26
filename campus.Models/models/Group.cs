using Models;
using Models.interfaces;

public class Group : Entity
{
    public List<Student> Students { get; private set; }
    public List<Teacher> Teachers { get; private set; }
}




