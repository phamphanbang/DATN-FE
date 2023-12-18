import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
} from "@chakra-ui/react";
import { getAudio } from "utils";
import { FileField } from "../FileField";
import { ChangeEvent, useEffect, useState } from "react";

interface IAudioFieldInput {
  deleteAudio: () => void;
  audio: string | File;
  audioPrefix: string;
  title: string;
  inputKey: string;
  handleFileChangeValue: (
    e: ChangeEvent<HTMLInputElement>,
    key: string
  ) => void;
}

const AudioFieldInput = ({
  deleteAudio,
  audio,
  title,
  inputKey,
  audioPrefix,
  handleFileChangeValue,
}: IAudioFieldInput) => {
  const [currentAudio, setCurrentAudio] = useState<string>("");

  const updateAudio = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const res = URL.createObjectURL(file as File);

    setCurrentAudio(res);
  };

  useEffect(() => {
    if (!audio) return;
    const res =
      typeof audio === "string"
        ? audio
        : URL.createObjectURL(audio as File);
    setCurrentAudio(res);
  }, [audio]);

  return (
    <FormControl key={inputKey}>
      <FormLabel fontSize={16} my={1} fontWeight="normal">
        {title}
      </FormLabel>
      <Box
        position={"relative"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        my={"14px"}
      >
        <audio
          controls
          src={currentAudio}
          preload="none"
          style={{
            width: "80%",
            padding: "0px 14px",
          }}
        ></audio>

        <Button
          h="50px"
          colorScheme="gray"
          onClick={() => {
            setCurrentAudio("");
            deleteAudio();
          }}
        >
          Delete {title}
        </Button>
      </Box>

      <FileField
        name={inputKey}
        accept="audio/*"
        onChange={(e) => {
          updateAudio(e);
          handleFileChangeValue(e, inputKey);
        }}
        onClick={(e) => (e.currentTarget.value = "")}
      />
    </FormControl>
  );
};

export default AudioFieldInput;
