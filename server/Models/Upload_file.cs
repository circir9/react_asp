namespace server.Models;

public class Upload_file{
    public int ID { get; set; }

    public string? File_name { get; set; }

    public string? Path { get; set; }

    public string? User_name { get; set; }

    public DateTime Upload_time { get; set; }
}

public class GetFileModel
{
    public int ID { get; set; }
    public string? File_name { get; set; }
    public DateTime Upload_time { get; set; }
}