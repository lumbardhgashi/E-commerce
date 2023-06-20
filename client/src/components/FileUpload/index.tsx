import { InputHTMLAttributes } from "react";

import icon from "../../assets/icons/uploadactive.svg";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  name: string;
  value: any;
  error?: string;
  onChange: (event: any) => void;
}

const FileInput: React.FC<Props> = ({
  label,
  type,
  name,
  onChange,
  value,
  error,
  ...props }: Props) => {


  const onChangeHandler = (e: any) => {
    console.log(e.target.files);
    onChange({ target: { name: e.target.name, value: e.target.files[0] } });
  };

  console.log(value);

  return (
    <div
      className="fileInput"
    >
      <label htmlFor={name} className={`fileInput__container ${error && "fileInput__error"}`}>
        {value ? (
          <img className="fileInput__preview" src={value} alt="img" />
        ) : (
          <>
            <img src={icon} alt="icon" />
            <span className="fileInput__label">{label}</span>
          </>
        )}
        <input
          className="fileInput__input"
          type={type}
          name={name}
          id={name}
          onChange={e => onChangeHandler(e)}
          {...props}
        />
      </label>
      <p className="fileInput__error-message">{error}</p>
    </div>
  );
}

export default FileInput