import React from "react"
import { postProduct } from "../../api"
import { useMutation, useQueryClient } from "react-query"
import { Box, FormControl, FormLabel, Text, Input, Textarea, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { Formik, FieldArray } from "formik"
import validationSchema from "./validations"
import { message } from "antd"
import AdminNavbar from "../Admin/AdminNavbar"

function NewProduct() {
  const queryClient = useQueryClient()
  const newProductMutation = useMutation(postProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  })

  const handleSubmit = async (values, bag) => {
    console.log(values)
    message.loading({ content: "Loading...", key: "product_update" })

    const newValues = {
      ...values,
      photos: JSON.stringify(values.photos),
    }

    newProductMutation.mutate(newValues, {
      onSuccess: () => {
        message.success({
          content: "Add Product is successfully",
          key: "product_update",
          duration: 2,
        })
      },
    })
  }

  return (
    <div>
      <AdminNavbar />

      <Box mt={6}>
        <Formik
          initialValues={{
            title: "",
            description: "",
            price: "",
            photos: [],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
            <>
              <Box>
                <Box m={5} textAlign="left">
                  <form onSubmit={handleSubmit}>
                    <FormControl>
                      <FormLabel>Title</FormLabel>
                      <Input name="title" onChange={handleChange} onBlur={handleBlur} value={values.title} disabled={isSubmitting} isInvalid={touched.title && errors.title} />
                      {touched.title && errors.title && (
                        <Text mt={2} color="red.500">
                          {errors.title}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Description</FormLabel>
                      <Textarea name="description" onChange={handleChange} onBlur={handleBlur} value={values.description} disabled={isSubmitting} isInvalid={touched.description && errors.description} />
                      {touched.description && errors.description && (
                        <Text mt={2} color="red.500">
                          {errors.description}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Price</FormLabel>
                      <Input name="price" onChange={handleChange} onBlur={handleBlur} value={values.price} disabled={isSubmitting} isInvalid={touched.description && errors.description} />
                      {touched.price && errors.price && (
                        <Text mt={2} color="red.500">
                          {errors.price}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Photos</FormLabel>
                      <FieldArray
                        name="photos"
                        render={(arrayHelpers) => (
                          <div>
                            {values.photos &&
                              values.photos.map((photo, index) => (
                                <div key={index} style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
                                  <Input name={`photos.${index}`} value={photo} disabled={isSubmitting} onChange={handleChange} width="90%" />
                                  <Button ml="4" type="button" colorScheme="red" onClick={() => arrayHelpers.remove(index)}>
                                    Remove
                                  </Button>
                                </div>
                              ))}
                            <Button colorScheme="messenger" onClick={() => arrayHelpers.push("")}>
                              Add a Photo
                            </Button>
                          </div>
                        )}
                      />
                    </FormControl>
                    <Button colorScheme="green" my={8} width="full" type="submit" isLoading={isSubmitting} boxShadow="lg">
                      Add Product
                    </Button>
                  </form>
                </Box>
              </Box>
            </>
          )}
        </Formik>
      </Box>
    </div>
  )
}

export default NewProduct
