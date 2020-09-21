import React, { memo, useRef, useCallback } from "react";
import { Grid, Button } from "@material-ui/core";

// eslint-disable-next-line no-unused-vars
import { ValidateEmailInput } from "../ValidateEmailInput";
import { ValidatePasswordInput } from "../ValidatePasswordInput";
import { ValidateNameInput } from "../ValidateNameInput";
import { useVariable } from "src/customhook";

import { WarningState, warning } from "./WarningState";
import { useStyles } from "./style";

export interface Infos {
  email: string;
  password: string;
  name: string;
}

type SetInfos = (infos: Infos) => void;

interface CreateFormProps extends BaseComponentProps {
  setInfos: SetInfos;
  isShownLabel: boolean;
  warningKey: warning;
}

interface GetMethodsRef extends Record<string, GetRaisedData> {
  Name: GetRaisedData;
  Email: GetRaisedData;
  Password: GetRaisedData;
}

const defaultRaisedData: RaisedData = {
  isRegular: true,
  value: "",
};

const getDefaultRaisedData: GetRaisedData = () => defaultRaisedData;

const defaultGetMethodsRef: GetMethodsRef = {
  Name: getDefaultRaisedData,
  Email: getDefaultRaisedData,
  Password: getDefaultRaisedData,
};

const mapAttr = function <
  Item,
  Key extends keyof Item,
  Value extends Item[Key],
  CallBack extends (arg: Value) => any
>(obj: Item, func: CallBack) {
  const newObj = {} as Record<Key, ReturnType<CallBack>>;
  Object.entries(obj).map(([key, value]) => {
    newObj[key as Key] = func(value as Value);
  });
  return newObj;
};

const getInfoDetails = (current: GetMethodsRef) => mapAttr(current, (f) => f());

type InfoDetails = ReturnType<typeof getInfoDetails>;

const getIsRegulars = (details: InfoDetails) =>
  mapAttr(details, (e) => e.isRegular);

const isTrueAll = (flagObj: Record<string, boolean>) => {
  const flags = Object.values(flagObj);
  return flags.reduce((a, e) => (e ? a : false), true);
};

const getIsRegularAll = (detaiils: InfoDetails) => {
  const isRegulars = getIsRegulars(detaiils);
  return isTrueAll(isRegulars);
};

const getInfos = (details: InfoDetails): Infos => {
  const infos = mapAttr(details, (e) => e.value);
  return {
    email: infos.Email,
    name: infos.Name,
    password: infos.Password,
  };
};
const NotYetCreateForm: React.FC<CreateFormProps> = (props) => {
  // The ValidateEmailInput add attributes as a getter function
  // to current of getMethodsRef
  const getMethodsRef = useRef(defaultGetMethodsRef);

  const className = useVariable(props.className);
  const setInfos = useVariable(props.setInfos);
  const warningKey = useVariable(props.warningKey);
  const isShown = useVariable(props.isShownLabel);

  const classes = useStyles();

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const infoDetails = getInfoDetails(getMethodsRef.current);
      const isRegularAll = getIsRegularAll(infoDetails);
      if (isRegularAll) {
        const infos = getInfos(infoDetails);
        setInfos(infos);
      }
    },
    [setInfos]
  );

  return (
    <form {...{ className, onSubmit }}>
      <Grid container className={classes.container}>
        <Grid item>
          <WarningState {...{ warningKey, isShown }} />
        </Grid>
        <Grid item>
          <ValidateEmailInput ref={getMethodsRef} />
        </Grid>
        <Grid>
          <ValidateNameInput ref={getMethodsRef} />
        </Grid>
        <Grid item>
          <ValidatePasswordInput ref={getMethodsRef} />
        </Grid>
        <Grid item>
          <Button variant="outlined" type="submit" className={classes.button}>
            create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const CreateForm = memo(NotYetCreateForm);
CreateForm.displayName = "CreateForm";

export { CreateForm, warning };
