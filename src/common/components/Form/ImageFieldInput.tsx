import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
} from "@chakra-ui/react";
import { getImage } from "utils";
import { FileField } from "../FileField";
import { ChangeEvent, useEffect, useState, MouseEvent } from "react";

interface IImageFieldInput {
  deleteImage: () => void;
  image: string | File;
  imagePrefix: string;
  title: string;
  inputKey: string;
  imageIfNull: string;
  handleFileChangeValue: (
    e: ChangeEvent<HTMLInputElement>,
    key: string
  ) => void;
  isShowDefault?: boolean;
  imageBorderRadius?: string;
  imageW?: string;
  imageH?: string;
}

const ImageFieldInput = ({
  deleteImage,
  image,
  title,
  inputKey,
  imagePrefix,
  imageIfNull,
  handleFileChangeValue,
  isShowDefault = true,
  imageBorderRadius = "full",
  imageW = "200px",
  imageH = "200px",

}: IImageFieldInput) => {
  const [style, setStyle] = useState({ display: "none" });
  const [currentImage, setCurrentImage] = useState<string>("");

  const updateImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const res =
      typeof file === "string"
        ? getImage(imagePrefix, file ?? imageIfNull)
        : URL.createObjectURL(file as File);
    setCurrentImage(res);
  };

  useEffect(() => {
    const res =
      typeof image === "string"
        ? getImage(imagePrefix, image)
        : URL.createObjectURL(image as File);
    setCurrentImage(res);
  }, []);

  const showCondition = (): boolean => {
    const isCurrentImage = currentImage ? true : false;
    const isImage = image ? true : false;
    if (!isShowDefault) {
      return isCurrentImage && isImage;
    }
    return isCurrentImage;
  };

  const clearInput = (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
    e.currentTarget.value = "";
  };

  return (
    <FormControl key={inputKey}>
      <FormLabel fontSize={16} my={1} fontWeight="normal">
        {title}
      </FormLabel>
      {showCondition() && (
        <Box
          position={"relative"}
          onMouseEnter={() => {
            setStyle({ display: "flex" });
          }}
          onMouseLeave={() => {
            setStyle({ display: "none" });
          }}
        >
          <Image
            w={imageW}
            h={imageH}
            src={currentImage}
            alt={title}
            mx={"auto"}
            my={"10px"}
            borderRadius={imageBorderRadius}
          />
          <Box
            w={"100%"}
            h={"100%"}
            position={"absolute"}
            top={"0"}
            left={"0"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            backgroundColor={"#c5bfbf73"}
            style={style}
          >
            <Button
              mt="14px"
              h="50px"
              colorScheme="gray"
              onClick={() => {
                setCurrentImage(getImage(imagePrefix, imageIfNull));
                deleteImage();
              }}
            >
              Delete {title}
            </Button>
          </Box>
        </Box>
      )}

      <FileField
        name={inputKey}
        accept="image/*"
        onChange={(e) => {
          updateImage(e);
          handleFileChangeValue(e, inputKey);
        }}
        onClick={(e) => (e.currentTarget.value = "")}
      />
    </FormControl>
  );
};

export default ImageFieldInput;
