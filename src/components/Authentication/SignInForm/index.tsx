"use client";

import * as React from "react";
import {
  Button,
  Box,
  Typography,
  FormControl,
  TextField,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2"
import Link from "next/link";
import Image from "next/image";
import { InferInput, object, pipe, string, minLength, email, nonEmpty } from "valibot";
import { locale } from "dayjs";
import { signIn } from "next-auth/react";
import { Locale } from "next/dist/compiled/@vercel/og/satori";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useSearchParams,useRouter } from "next/navigation";



type ErrorType = {
  message: string[]
}

type FormData = InferInput<typeof schema>

const schema = object({
  username: pipe(string(), minLength(1, 'El campo es obligatorio')),
  password: pipe(
    string(),
    nonEmpty('El campo es obligatorio'),
    minLength(4, 'la contraseña debe tener al menos 4 digitos')
  )
})

const SignInForm: React.FC = () => {
  const [errorState, setErrorState] = React.useState<ErrorType | null>(null)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const searchParams = useSearchParams()
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setErrorMessage(null)
    const res = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false
    })
    
    if (res && res.ok ) {
      // Vars
      const redirectURL = searchParams.get('redirectTo') ?? '/blank-page/'

      router.push(redirectURL)
    } else {
      if (res?.error) {
        const error = res.error        
        setErrorMessage("Credenciales Invalidas");
      }
    }
  }
  return (
    <>
      <Box
        className="auth-main-wrapper sign-in-area"
        sx={{
          py: { xs: "60px", md: "80px", lg: "100px", xl: "135px" },
        }}
      >
        <Box
          sx={{
            maxWidth: { sm: "500px", md: "1255px" },
            mx: "auto !important",
            px: "12px",
          }}
        >
          <Grid
            container
            alignItems="center"
            columnSpacing={{ xs: 1, sm: 2, md: 4, lg: 3 }}
          >
            <Grid  size={{ xs:12, md:6, lg:6, xl:7}}>
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                }}
              >
                <Image
                  src="/images/sign-in.jpg"
                  alt="sign-in-image"
                  width={646}
                  height={804}
                  style={{
                    borderRadius: "24px",
                  }}
                />
              </Box>
            </Grid>

            <Grid  size={{ xs:12, md:6, lg:6, xl:5}}>

              <Box
                className="form-content"
                sx={{
                  paddingLeft: { xs: "0", lg: "10px" },
                }}
              >
                <Box
                  className="logo"
                  sx={{
                    mb: "23px",
                  }}
                >
                  <Image
                    src="/images/logo-big.svg"
                    alt="logo"
                    width={142}
                    height={38}
                  />
                  <Image
                    src="/images/white-logo.svg"
                    className="d-none"
                    alt="logo"
                    width={142}
                    height={38}
                  />
                </Box>

                <Box
                  className="title"
                  sx={{
                    mb: "23px",
                  }}
                >
                  <Typography
                    variant="h1"
                    className="text-black"
                    sx={{
                      fontSize: { xs: "22px", sm: "25px", lg: "28px" },
                      mb: "7px",
                      fontWeight: "600",
                    }}
                  >
                    Bienvenido de nuevo a Fidelis!
                  </Typography>

                 
                </Box>
                {/*
                 <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                    Sign In with social account or enter your details
                  </Typography>
                  <Box
                    className="with-socials"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      gap: "5px",
                      mb: "20px",
                    }}
                  >
                    <Button
                      variant="outlined"
                      className="border bg-white"
                      sx={{
                        width: "100%",
                        borderRadius: "8px",
                        padding: "10.5px 20px",
                      }}
                    >
                      <Image
                        src="/images/icons/google.svg"
                        alt="google"
                        width={25}
                        height={25}
                      />
                    </Button>

                    <Button
                      variant="outlined"
                      className="border bg-white"
                      sx={{
                        width: "100%",
                        borderRadius: "8px",
                        padding: "10.5px 20px",
                      }}
                    >
                      <Image
                        src="/images/icons/facebook2.svg"
                        alt="facebook"
                        width={25}
                        height={25}
                      />
                    </Button>

                    <Button
                      variant="outlined"
                      className="border bg-white"
                      sx={{
                        width: "100%",
                        borderRadius: "8px",
                        padding: "10.5px 20px",
                      }}
                    >
                      <Image
                        src="/images/icons/apple.svg"
                        alt="apple"
                        width={25}
                        height={25}
                      />
                    </Button>
                  </Box>
                */}
                <Box >
                <form 
                    noValidate
                    autoComplete='off'
                    onSubmit={handleSubmit(onSubmit)}      
                    className='flex flex-col gap-5'
                  >
                    <Box mb="15px">
                    <FormControl fullWidth>
                    <Controller
                      name='username'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <Typography
                            component="label"
                            sx={{
                              fontWeight: "500",
                              fontSize: "14px",
                              mb: "10px",
                              display: "block",
                            }}
                            className="text-black"
                          >
                            Nombre de Usuario
                          </Typography>

                          <TextField
                            {...field}
                            label="Nombre de Usuario"
                            variant="filled"
                            sx={{
                              "& .MuiInputBase-root": {
                                border: "1px solid #D5D9E2",
                                backgroundColor: "#fff",
                                borderRadius: "7px",
                              },
                              "& .MuiInputBase-root::before": {
                                border: "none",
                              },
                              "& .MuiInputBase-root:hover::before": {
                                border: "none",
                              },
                            }}
                            onChange={e => {
                              field.onChange(e.target.value)
                              errorState !== null && setErrorState(null)
                            }}
                            {...((errors.username || errorState !== null) && {
                              error: true,
                              helperText: errors?.username?.message || errorState?.message[0]
                            })}
                          />
                          </>                       
                      
                       )}
                    />
                    </FormControl>
                  
                    </Box>

                    <Box mb="15px">
                    <FormControl fullWidth>
                    <Controller
                      name='password'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        
                       <>
                          <Typography
                            component="label"
                            sx={{
                              fontWeight: "500",
                              fontSize: "14px",
                              mb: "10px",
                              display: "block",
                            }}
                            className="text-black"
                          >
                            Contraseña
                          </Typography>
                          <TextField
                          
                            {...field}
                            label="Digita la contraseña"
                            variant="filled"
                            type="password"
                        
                            sx={{
                              "& .MuiInputBase-root": {
                                border: "1px solid #D5D9E2",
                                backgroundColor: "#fff",
                                borderRadius: "7px",
                              },
                              "& .MuiInputBase-root::before": {
                                border: "none",
                              },
                              "& .MuiInputBase-root:hover::before": {
                                border: "none",
                              },
                            }}
                            onChange={e => {
                              field.onChange(e.target.value)
                              errorState !== null && setErrorState(null)
                            }}
                            {...((errors.password || errorState !== null) && {
                              error: true,
                              helperText: errors?.password?.message || errorState?.message[0]
                            })}
                          />
                       </>
                      )}
                      />
                       </FormControl>
                    </Box>

                    <Box mb="20px">
                      <Link
                        href="/auth/forgot-password/"
                        className="text-primary"
                        style={{
                          fontWeight: "500",
                        }}
                      >
                        Forgot Password?
                      </Link>
                    </Box>

                    <Box mb="20px">
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          textTransform: "capitalize",
                          borderRadius: "6px",
                          fontWeight: "500",
                          fontSize: { xs: "13px", sm: "16px" },
                          padding: { xs: "10px 20px", sm: "10px 24px" },
                          color: "#fff !important",
                          boxShadow: "none",
                          width: "100%",
                        }}
                      >
                        <i className="material-symbols-outlined mr-5">login</i>
                        Ingresar
                      </Button>
                    </Box>
                    <Box mb="20px">
                      {errorMessage && (
                        <Typography color="error">
                          {errorMessage}
                        </Typography>
                      )}
                      </Box>

                    <Typography>
                      Don’t have an account.{" "}
                      <Link
                        href="/auth/sign-up/"
                        className="text-primary"
                        style={{
                          fontWeight: "500",
                        }}
                      >
                        Sign Up
                      </Link>
                    </Typography>
                  </form>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default SignInForm;
