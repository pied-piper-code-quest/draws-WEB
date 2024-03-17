import { FC, useState } from 'react';
import { Button, Input, Textarea, Divider } from 'react-daisyui';
import { Field, FieldArray, Formik, Form } from 'formik';
import { DRAW_INITIAL_VALUES, DRAW_VALIDATION_SCHEMA, DrawFormValues } from './validations';

interface DrawFormProps {
  currentStep: number;
  handleCurrentStep: () => void;
}

const DrawForm: FC<DrawFormProps> = ({ currentStep, handleCurrentStep }) => {


  const handleSubmit = (values: DrawFormValues) => {
    console.log(values);

  }

  return (
    <Formik
      initialValues={DRAW_INITIAL_VALUES}
      validationSchema={DRAW_VALIDATION_SCHEMA}
      enableReinitialize
      onSubmit={(values) => handleSubmit(values)}
    >
      {({
        values,
        // errors,
        handleChange,
      }) => (
        <Form className="p-4 space-y-3">
          {(currentStep === 1) && (
            <>
              <div>
                <label htmlFor="title" className="sr-only">Títuto</label>
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
                <label htmlFor="description" className="sr-only">Descripción</label>
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

          {(currentStep === 2) && (
            <div className="w-full flex flex-row">
              <div className="w-1/2">
                <div>
                  <label htmlFor="title" className="sr-only">Títuto</label>
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
                    <label htmlFor="numberOfWinners" className="sr-only">Títuto</label>
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

                <div className="flex justify-between items-start">
                  <p>No. de Premios</p>
                  <div>
                    <FieldArray
                      name="prizes"
                      render={(arrayHelpers) => (
                        <>
                          {values.prizes && values.prizes.length > 0 ? (
                            values.prizes.map((prize, index) => (
                              <div key={index} className="flex justify-end items-center mb-2">
                                <Field name={`prizes.${index}`}>
                                  {({ field }) => (
                                    <div>
                                      <label htmlFor={`prizes.${index}`} className="sr-only">Premio {index + 1}</label>
                                      <div className="relative">
                                        <Input
                                          {...field}
                                          placeholder={`Premio ${index + 1}`}
                                          className="w-full text-secondary border-2 placeholder:text-secondary"
                                          color="secondary"
                                          type="text"
                                          defaultValue=""
                                        />
                                      </div>
                                    </div>
                                  )}
                                </Field>
                                <Button
                                  type="button"
                                  className="ms-1"
                                  onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                >
                                  -
                                </Button>
                                <Button
                                  className="ms-1"
                                  type="button"
                                  onClick={() => arrayHelpers.insert(index, '')}
                                >
                                  +
                                </Button>
                              </div>
                            ))
                          ) : (
                            <Button type="button" onClick={() => arrayHelpers.push('')}>
                              Add a Prize
                            </Button>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>
              <Divider horizontal />
              <div className="w-1/2">
                <div>
                  <p>Participantes</p>

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