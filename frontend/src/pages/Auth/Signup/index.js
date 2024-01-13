import React from "react"
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Alert } from "@chakra-ui/react"
import { useFormik } from "formik"
import validationSchema from "./validations"
import { fetcRegister } from "../../../api"
import { useAuth } from "../../../contexts/AuthContext"

function Signup({ navigate }) {
  const { login } = useAuth()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetcRegister({
          email: values.email,
          password: values.password,
        })
        login(registerResponse)
        navigate("/profile")
      } catch (e) {
        bag.setErrors({ general: e.response.data.message })
      }
    },
  })
  return (
    <div style={{ height: "100%" }}>
      <Flex align="center" width="100%" height="100%" justifyContent="center">
        <Box p={10} background={"white"} borderRadius={"10px"} boxShadow={"md"}>
          <Box textAlign="center">
            <Heading fontSize={"30px"}>Create a new account</Heading>
          </Box>
          <Box my={5}>{formik.errors.general && <Alert status="error">{formik.errors.general}</Alert>}</Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} isInvalid={formik.touched.email && formik.errors.email} />
              </FormControl>

              <FormControl mt="4">
                <FormLabel>Password</FormLabel>
                <Input name="password" type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} isInvalid={formik.touched.password && formik.errors.password} />
              </FormControl>

              <FormControl mt="4">
                <FormLabel>Password Confirm</FormLabel>
                <Input name="passwordConfirm" type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.passwordConfirm} isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm} />
              </FormControl>

              <Button mt="8" width="full" type="submit">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default Signup
