import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  Divider,
  IconButton,
  Slide,
  Snackbar,
  Typography,
} from "@material-ui/core";
import CountDown from "../Commons/CountDown";
import React, { useState } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import ContactUs from "./ContactUs";
import { SubmitState } from "../Commons/UseErrorHandling";
import { Offline } from "react-detect-offline";
import ButtonWithDetail from "../Commons/ButtonWithDetail";

function FailedHeader({ onClose }: { onClose: () => void }) {
  return (
    <Box>
      <AlertTitle className={"flex justify-between items-start"}>
        <Typography variant={"h5"}>Не удалось отправить заказ</Typography>
        <IconButton size={"small"} aria-label={"закрыть"} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </AlertTitle>
      <Offline>
        <Typography variant={"caption"}>
          Скорее всего у вас пропал интернет
        </Typography>
      </Offline>
    </Box>
  );
}

function ManualOrderMessage({
  onClose,
}: {
  onClose: () => void;
}): React.ReactElement {
  const [showContactUs, setShowContactUs] = useState(false);

  return (
    <Alert severity={"info"}>
      <Box pb={2}>
        <FailedHeader onClose={onClose} />
        <Typography gutterBottom>Выберете что делать</Typography>
        <Typography variant={"caption"}>
          Нажмите на вопросик чтобы узнать детали.
        </Typography>
        <Box className={"flex justify-between items-center"}>
          <ButtonWithDetail
            size={"small"}
            variant={"outlined"}
            detailText={
              "Попробовать еще раз. Может помочь если у вас вернулся интернет."
            }
          >
            Повторить
          </ButtonWithDetail>
          <ButtonWithDetail
            size={"small"}
            variant={"outlined"}
            detailText={"Заказать телефоном или в телеграме"}
            onClick={() => setShowContactUs((prev) => !prev)}
          >
            ДРУГОЙ СПОСОБ
          </ButtonWithDetail>
        </Box>
      </Box>
      <Collapse in={showContactUs}>
        <Divider />
        <Box my={1}>
          <Typography>
            Пожалуйста, попробуйте заказать по телефону или написать в телеграм
          </Typography>
          <ContactUs />
        </Box>
      </Collapse>
    </Alert>
  );
}

function RetryMessage({
  retryNumber,
  retryPeriod,
  onClose,
}: {
  retryNumber: number;
  retryPeriod: number;
  onClose: () => void;
}) {
  return (
    <Alert severity={"warning"}>
      <FailedHeader onClose={onClose} />
      <Typography>
        Попробую еще раз через{" "}
        <CountDown countDownId={retryNumber} periodSec={retryPeriod} />
      </Typography>
    </Alert>
  );
}

function OkMessage() {
  return (
    <Alert severity={"success"}>
      <Typography>Заказ отправлен успешно</Typography>
    </Alert>
  );
}

function Sending({ onCancel }: { onCancel: () => void }): React.ReactElement {
  return (
    <Alert
      severity={"info"}
      action={
        <ButtonWithDetail
          detailText={"Отменить запрос и попробовать другой способ"}
          size={"small"}
          onClick={onCancel}
        >
          ОТМЕНА
        </ButtonWithDetail>
      }
    >
      <Typography>Отправляю заказ...</Typography>
      <Offline>
        <Typography>Скорее всего у вас пропал интернет</Typography>
      </Offline>
    </Alert>
  );
}

export default function OrderFallback({
  orderSubmitState,
  retryNumber,
  retryPeriod,
  onClose,
  onCancel,
}: {
  orderSubmitState: SubmitState;
  retryNumber: number;
  retryPeriod: number;
  onClose: () => void;
  onCancel: () => void;
}): JSX.Element {
  function getSubmitMessage(): [React.ReactElement, number | undefined] {
    switch (orderSubmitState) {
      case "CANCELLED":
      case "CLIENT_ERROR":
      case "SERVER_ERROR":
        return [<ManualOrderMessage onClose={onClose} />, undefined];
      case "OK":
        return [<OkMessage />, 1000];
      case "RETRY_TIMEOUT":
        return [
          <RetryMessage
            onClose={onClose}
            retryNumber={retryNumber}
            retryPeriod={retryPeriod}
          />,
          undefined,
        ];
      case "SENDING":
      case "RETRYING":
        return [<Sending onCancel={onCancel} />, undefined];
      case "NOT_SUBMITTED":
        return [<></>, undefined];
    }
  }

  const [currentMessage, autoHide] = getSubmitMessage();
  return (
    <Snackbar
      TransitionComponent={Slide}
      autoHideDuration={autoHide}
      open={orderSubmitState != "NOT_SUBMITTED"}
    >
      <Box>{currentMessage}</Box>
    </Snackbar>
  );
}