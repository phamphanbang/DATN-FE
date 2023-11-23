import { Editor } from "@tinymce/tinymce-react";

interface ITinyMCEProps {
  handleEditorChange: (content: any, editor: any) => void;
  initValue: string;
}

const TinyMCE = ({handleEditorChange, initValue }: ITinyMCEProps) => {
  return (
    <Editor
      id="asd"
      apiKey="zszh9p1yaxftukpwbnynekdajjnfaw7ihg0kn3uriw2j0wm8"
      init={{
        plugins:
          " anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" },
        ],
        width: "100%",
      }}
      value={initValue}
      onEditorChange={handleEditorChange}
    />
  );
};

export default TinyMCE;
