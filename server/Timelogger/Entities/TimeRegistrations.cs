namespace Timelogger.Entities
{
    public class TimeRegistrations
    {
        public int Id { get; set; }
        public int ProjectId { get; set; } 
        public int RegisteredTime { get; set; }
        public string Note { get; set; }
        public string Date { get; set; }
    }
}
