import * as Yup from "yup";

export interface DrawFormValues {
  id?: string;
  title: string;
  description: string;
  status?: string;
  available: boolean;
  maxParticipants?: number;
  numberOfWinners: number;
  prizes: string[];
  resultDate?: Date;
  maxDateToJoin?: Date;
  participants?: string[];
  winners?: string[];
  manual: boolean;
}

export const DRAW_INITIAL_VALUES: DrawFormValues = {
  title: "",
  description: "",
  status: "",
  available: false,
  numberOfWinners: 0,
  prizes: [],
  resultDate: new Date(),
  manual: true,
};

export const DRAW_VALIDATION_SCHEMA = Yup.object().shape({
  title: Yup.string().required("Requerido"),
  prizes: Yup.array(Yup.string()).required("Requerido"),
  numberOfWinners: Yup.string().required("Requerido"),
});
