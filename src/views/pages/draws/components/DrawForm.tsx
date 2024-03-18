import { 
  FC, 
  // useState
} from "react";
import { Button, Input, Textarea, Divider } from "react-daisyui";
import { Field, FieldArray, Formik, Form } from "formik";
import {
  DRAW_INITIAL_VALUES,
  DRAW_VALIDATION_SCHEMA,
  DrawFormValues,
} from "./validations";
import CompetitorList from "./CompetitorList";
// import { useCompetitorsStore } from "../../../../stores";
// import { DrawsService } from "../../../../services/draws.service";

interface DrawFormProps {
  currentStep: number;
  handleCurrentStep: () => void;
}

const DrawForm: FC<DrawFormProps> = ({ currentStep, handleCurrentStep }) => {
  // const selectedCompetitors = useCompetitorsStore(
  //   state => state.selectedCompetitors,
  // );

  const handleSubmit = async (_values: DrawFormValues) => {
    // await DrawsService.createDraw({ ...values, participants: selectedCompetitors })
  };

  return (
    <Formik
      initialValues={DRAW_INITIAL_VALUES}
      validationSchema={DRAW_VALIDATION_SCHEMA}
      enableReinitialize
      onSubmit={values => handleSubmit(values)}
    >
      {({
        values,
        // errors,
        handleChange,
      }) => (
        <Form className="p-4 space-y-3">
          {currentStep === 1 && (
            <>
              <div>
                <label htmlFor="title" className="sr-only">
                  Títuto
                </label>
                <div className="relative">
                  <Input
                    className="w-full text-secondary mb-2 border-2 placeholder:text-secondary"
                    color="secondary"
                    type="text"
                    placeholder="Títuto"
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="sr-only">
                  Descripción
                </label>
                <div className="relative">
                  <Textarea
                    className="w-full text-secondary mb-2 border-2 placeholder:text-secondary"
                    color="secondary"
                    placeholder="Descripción"
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    rows={5}
                    size="md"
                  />
                </div>
              </div>

              <Button
                color="primary"
                // type="submit"
                className="w-full"
                onClick={handleCurrentStep}
              >
                COMENZAR
              </Button>
            </>
          )}

          {currentStep === 2 && (
            <div className="w-full flex flex-row">
              <div className="w-1/2">
                <div>
                  <label htmlFor="title" className="sr-only">
                    Títuto
                  </label>
                  <div className="relative">
                    <Input
                      className="w-full text-secondary mb-2 border-2 placeholder:text-secondary"
                      color="secondary"
                      type="text"
                      placeholder="Títuto"
                      id="title"
                      name="title"
                      value={values.title}
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p>No. de Ganadores</p>
                  <div>
                    <label htmlFor="numberOfWinners" className="sr-only">
                      Títuto
                    </label>
                    <div className="relative flex justify-end">
                      <Input
                        className="w-4/12 text-secondary mb-2 border-2 placeholder:text-secondary"
                        color="secondary"
                        type="number"
                        placeholder="No. de Ganadores"
                        id="numberOfWinners"
                        name="numberOfWinners"
                        value={values.numberOfWinners}
                        onChange={handleChange}
                        min={1}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-stary">
                  <p className="text-[#6131D1] text-xl"> Premios</p>
                  <div>
                    <FieldArray
                      name="prizes"
                      render={() => (
                        <>
                          {values.numberOfWinners > 0 &&
                            Array.from(
                              Array(values.numberOfWinners).keys(),
                            ).map((price: number) => (
                              <div key={price}>
                                <Field name={`prizes.${price}`} defaultValue="">
                                  {/* {({ field }) => (
                                  <div>
                                    <label htmlFor={`prizes.${price}`} className="sr-only">Premio {price + 1}</label>
                                    <div className="relative">
                                      <Input
                                        {...field}
                                        placeholder={`Premio ${price + 1}`}
                                        className="w-full text-secondary mb-2 border-2 placeholder:text-secondary"
                                        color="secondary"
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                )} */}
                                </Field>
                              </div>
                            ))}
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>
              <Divider horizontal />
              <div className="w-1/2">
                <div>
                  <p className="text-[#6131D1]">Participantes</p>
                  <CompetitorList />
                </div>
                <div className="flex justify-end mt-3">
                  <Button color="primary" type="submit">
                    FINALIZAR
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default DrawForm;
