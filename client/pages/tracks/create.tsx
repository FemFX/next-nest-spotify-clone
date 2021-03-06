import { useState } from "react";
import axios from "axios";
import { Button, Card, Grid, TextField } from "@material-ui/core";
import StepWrapper from "../../components/StepWrapper";
import MainLayout from "../../layouts/MainLayout";
import FileUpload from "../../components/FileUpload";
import { useInput } from "../../hooks/useInput";
import { useRouter } from "next/router";

const Create = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const name = useInput("");
  const artist = useInput("");
  const text = useInput("");

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("artist", artist.value);
      formData.append("text", text.value);
      formData.append("picture", picture);
      formData.append("audio", audio);
      axios
        .post("http://localhost:5000/track", formData)
        .then(() => router.push("/tracks"));
    }
  };
  const back = () => {
    setActiveStep((prev) => prev - 1);
  };
  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction="column" style={{ padding: 20 }}>
            <TextField
              {...name}
              style={{ marginTop: 10 }}
              label="Название трека"
            />
            <TextField
              {...artist}
              style={{ marginTop: 10 }}
              label="имя исполнителя"
            />
            <TextField
              {...text}
              style={{ marginTop: 10 }}
              label="Слова трека"
              multiline
              rows={3}
            />
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept="image/*">
            <Button>Загрузить Изображение</Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept="audio/*">
            <Button>Загрузить Трек</Button>
          </FileUpload>
        )}
      </StepWrapper>
      <Grid>
        <Button disabled={activeStep === 0} onClick={back}>
          Назад
        </Button>
        <Button onClick={next}>
          Далее
        </Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;
