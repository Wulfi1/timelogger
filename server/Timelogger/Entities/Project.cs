namespace Timelogger.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string ProjectName { get; set; }
        public string CustomerName { get; set; }
        public string Date { get; set; }
        public float RegisteredTime { get; set; } = 0;
        public bool IsEnded {get; set;} = false;
    }
}
