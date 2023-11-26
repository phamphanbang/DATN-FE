import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import TinyMCE from "common/components/TinyMCE/TinyMCE";
import { ExamGroup, ExamQuestion } from "models/exam";
import { ValidationErrorMessage } from "models/appConfig";
import { ChangeEvent } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Question from "./Question";
import { FormParams } from "models/app";

interface IGroup {
  group: ExamGroup;
  handleEditorChange: (content: any, editor: any) => void;
  register: UseFormRegister<FormParams>;
  errors?: FieldErrors<FormParams>;
  handleChangeValue: (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => void;
  validationError: ValidationErrorMessage[] | [];
}

const Group = ({
  group,
  handleChangeValue,
  handleEditorChange,
  register,
  validationError,
  errors,
}: IGroup) => {
  return (
    <>
      <TinyMCE
        initValue={group.question}
        handleEditorChange={handleEditorChange}
      />
      <Accordion allowToggle w={'100%'} mt={'10px'}>
        {group.questions?.map((question) => {
          return (
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Question <b>{question.order_in_test}</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"flex-end"}
              >
                <Question
                  handleChangeValue={handleChangeValue}
                  question={question}
                  register={register}
                  validationError={validationError}
                  errors={errors}
                />
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default Group;
