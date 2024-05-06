import { FileUploadOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, accept }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [toolTipText, setToolTipText] = useState<string>(
    "Cliquez pour sélectionner un fichier"
  );

  useEffect(() => {
    if (selectedFile) {
      setToolTipText(selectedFile.name);
    }
  }, [selectedFile]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current !== null && fileInputRef.current !== undefined) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileUpload(file);
    }
  };

  return (
    <div>
      <input
        id="file-input"
        ref={fileInputRef}
        type="file"
        accept={accept ?? "*"}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Tooltip title={toolTipText} arrow>
        <TextField
          label="Fichier"
          variant="outlined"
          value={selectedFile ? selectedFile.name : ""}
          onClick={handleButtonClick}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleButtonClick}>
                  <FileUploadOutlined />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Tooltip>
    </div>
  );
};

export default FileUpload;
