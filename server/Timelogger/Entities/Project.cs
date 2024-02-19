namespace Timelogger.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Field1 { get; set; }
        public string Field2 { get; set; }
        public string Field3 { get; set; }
        public float RegisteredTime { get; set; } = 0;
        public bool IsEnded {get; set;} = false;
    }
}
