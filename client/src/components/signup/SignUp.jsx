import styled from "styled-components";
import SideImage from "../../utils/images/sidePanel.svg"
import FormLogo from "../../utils/images//form_logo.png";
import "./SignUp.css"
import { useEffect, useState } from "react";
import FloatingLabel from "../input/FloatingLabel";
import SelectFloat from "../input/SelectFloat";
import { SnackbarProvider,useSnackbar } from 'notistack'
import { isdData, titleData} from "../../utils/data";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  height:100%;
  display: flex;
  background: #ffffff;
  align-items: stretch;
`;

const Left = styled.div`
  flex:1;
  position:relative;
  margin-left:-4px;
  height: 120vh;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Image = styled.img`
  position: relative;
  height: 90%;
  width: 100%;
  object-fit: cover;
`;

const Right = styled.div`
  position: relative;
  flex: 0.9;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 16px;
  align-items: center;
  margin-top: -2%;
  // justify-content: center;
  @media screen and (max-width: 768px) {
    flex: 1;
  }
`;
const LogoImage = styled.img`
  height: 55px;
  width: 95px;
`;
const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  align-items: center;
  justify-content: center;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 100;
  letter-spacing: 1.2px;
`;

const Button = styled.button`
  border-radius: 20px;
  color: white;
  background: #ed9324;
  border:none;
  font-size: 14px;
  font-weight: 200;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow: 1px 6px 20px 5px rgba(0,0,0,0.1);
  height: min-content;
  padding: 11px 40px;
`;

const Text = styled.div`
  display: flex;
  gap: 12px;
  font-size: 16px;
  letter-spacing: 0.5px;
  text-align: center;
  justify-content:center;
  // color: ;
  margin-top: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const TextButton = styled.div`
  color: blue;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 300;
`;
const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;
const ResendText = styled.div`
  color: gray;
  cursor: pointer;
  font-weight: 300;
  margin-top: 10px;
  text-align: right;
  font-size: 14px;
`;
const ConflictDiv = styled.div`
  height: auto;
  text-align:center;
  width: auto%;
  border: 1px solid red;
  border-radius: 10px;
  padding: 8px 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    width: 80%;
  }
`;
const ConflictDivText = styled.div`
  font-size: 19px;
  letter-spacing: 0.5px;
  text-align: center;
  justify-content:center;
  margin-top: 16px;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const SignUp = ({userName, setUserName}) => {
  const [title, setTitle] = useState("");
  const [isd, setIsd] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  const [titleError, setTitleError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [isdError, setIsdError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");

  const [conflictdivVisibility, setConflictdivVisibility] = useState(false);
  const [conflictDivData, setconflictDivData] = useState("");

  const navigate = useNavigate();

  const { enqueueSnackbar,closeSnackbar } = useSnackbar();
  const enqueueSuccessSnackbar = (message="OTP generated and sent successfully") => {
    enqueueSnackbar(message, {
      variant: "success"
    });
  };
  const enqueueWarningSnackbar = () => {
    enqueueSnackbar("Invalid OTP", {
      variant: "warning"
    });
  };
  useEffect(() => {
    let timer;
    if (showOtpInput && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showOtpInput, resendTimer]);

  const validateForm = () => {
    let valid = true;

    if (!title) {
      setTitleError("Title is required");
      valid = false;
    } else {
      setTitleError("");
    }

    if (!userName) {
      setUserNameError("Name is required");
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(userName)) {
      setUserNameError("Name must contain only letters");
      valid = false;
    }  else {
      setUserNameError("");
    }

    if (!isd) {
      setIsdError("ISD is required");
      valid = false;
    } else {
      setIsdError("");
    }

    if (!mobile) {
      setMobileError("Mobile number is required");
      valid = false;
    }else if (!/^\d{6,12}$/.test(mobile)) {
      setMobileError("Mobile number must be 6-12 digits");
      valid = false;
    } else {
      setMobileError("");
    }

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      valid = false;
    } else {
      setEmailError("");
    }

    return valid;
  };

  const handleSubmit = async () => {
    const reqBody = {
      "name": userName,
      "mobile": `${isd} ${mobile}`,
      email,
      "salutation" : title
    }
    if (validateForm()) {
      await axios.post("https://colo-dev.infollion.com/api/v1/self-registration/register",reqBody)
                  .then((response)=>{
                    enqueueSuccessSnackbar(response.message);
                    setShowOtpInput(true); 
                    setResendTimer(60);
                    setConflictdivVisibility(false);
                  }).catch((error)=> {
                    setconflictDivData(error);
                    setConflictdivVisibility(true)
                  }); 
    }
  };
  const handleResendOtp = () => {
    enqueueSuccessSnackbar();
    setResendTimer(60); 
  };
  const handleOtpSubmit = () => {
    const lastSixDigits = mobile.slice(-6);
    if (otp !== lastSixDigits) {
      setOtpError("Invalid OTP");
      enqueueWarningSnackbar();
    } else {
      setOtpError("");
      navigate("/welcome");
    }
  };

  
  return (
    <Container>
        <Left>
            <Image src={SideImage} />
        </Left>
        <Right>
          <FormContainer>
            <LogoImage src={FormLogo} alt="logo"/>
            <Title>Register as an expert</Title>
            <div style={{ display: "grid", gap: "20px" }}>
              <div style={{ display: "flex", gap: "20px" }}>
                <div>
                  <SelectFloat label="Mr/Mrs*" name="userName">
                    <select
                      value={title}
                      onChange={(e) =>
                        setTitle(e.target.value)
                      }
                      >
                      <option hidden selected value=""></option>
                      {titleData.map((data)=>(
                        <option key={data} value={data}>{data}</option>
                      ))}
                    </select>
                  </SelectFloat>
                  {titleError && <ErrorMessage>{titleError}</ErrorMessage>}
                </div>
                <div>
                  <FloatingLabel label="Name*" name="userName" value={userName}>
                    <input 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      />
                  </FloatingLabel>
                  {userNameError && <ErrorMessage>{userNameError}</ErrorMessage>}
                </div>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <div>
                  <SelectFloat label="ISD*" name="isd">
                    <select
                      value={isd}
                      onChange={(e) => setIsd(e.target.value)}
                      >
                      <option selected hidden value=""></option>
                      {isdData.map((data)=>(
                        <option key={data.code} value={data.dial_code}>{`${data.name} (${data.dial_code})`}</option>
                      ))}
                    </select>
                  </SelectFloat>
                  {isdError && <ErrorMessage>{isdError}</ErrorMessage>}
                </div>
                <div>
                  <FloatingLabel label="Mobile Number*" name="mobile" value={userName}>
                    <input 
                      type="number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      />
                  </FloatingLabel>
                  {mobileError && <ErrorMessage>{mobileError}</ErrorMessage>}
                </div>
              </div>
              <div>
                <FloatingLabel label="Email ID*" name="email" value={userName}>
                  <input style={{"width":"100%"}}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </FloatingLabel>
                {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
              </div>
              {showOtpInput && (
              <div style={{ display: "flex", flexDirection: "column", "letterSpacing":"1px"}}>
                <FloatingLabel label="OTP*" name="otp">
                  <input style={{"width":"100%"}}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    name="otp"
                  />
                </FloatingLabel>
                {resendTimer > 0 ? (
                  <ResendText>Resend OTP in {resendTimer} seconds</ResendText>
                ) : (
                  <ResendText onClick={handleResendOtp}>Resend OTP</ResendText>
                )}
              </div>
            )}
            {showOtpInput ? (
              <Button onClick={handleOtpSubmit}>Submit OTP</Button>
            ) : (
              <Button onClick={handleSubmit}>Get OTP on email</Button>
            )}
              {/* <Button onClick={handleSubmit}>
                Get OTP on email
              </Button > */}
            </div>
            <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={2000} />
          </FormContainer>
          {conflictdivVisibility ? (
            <ConflictDiv>
              <ConflictDivText>
                An account already exists with this email ID : <p>{email}</p>
                 or with number : {mobile }
              </ConflictDivText>
            </ConflictDiv>
          ):(
            <Text>
              Already have an account?<TextButton>Sign In</TextButton>
            </Text>
          )}
        </Right>
    </Container>
  )
}
