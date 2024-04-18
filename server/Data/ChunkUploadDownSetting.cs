namespace server.Data;

public class ChunkUploadDownSetting : UploadDownSettings{
    public string FilesDir { 
        get { return "Upload/chunk"; } 
    }
}