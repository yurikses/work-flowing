'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useDialog } from '@/context/DialogContext'
import { useTasks } from '@/hooks/useTask'
import { signIn, signUp } from '@/lib/auth-client'
/* Auth Forms */
const formSignUpSchema = z.object({
  name: z.string().min(2, {
    message: 'Имя должно содержать не меньше 2 символов.',
  }),
  email: z.email('Введите существующую почту.'),
  password: z.string().min(8, { message: 'Пароль должен быть длиннее 8 символов' }),
  confirmPassword: z.string().min(8, { message: 'Пароль должен быть длиннее 8 символов' }),

}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: 'custom',
      message: 'Пароли не совпадают',
      path: ['confirmPassword'], // This targets the error to the confirmPassword field
    })
  }
})

const formSignIpSchema = z.object({
  email: z.email('Введите существующую почту.'),
  password: z.string().min(8, { message: 'Пароль должен быть длиннее 8 символов' }),

})

export function SignUpForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSignUpSchema>>({
    resolver: zodResolver(formSignUpSchema),
    defaultValues: {
      name: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSignUpSchema>) {
    const user = await signUp.email(values)
    if (user.error) {
      toast(
        'Ошибка регистрации. Данные введены не верно или уже существуют записи с введенными данными.',
        {
          action: {
            label: 'Понял',
            onClick: () => { console.log('Error toast is closed.') },
          },
        },
      )
      console.log(user.error)
    }
    else {
      router.push('/')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя:</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>

              </FormDescription>

              <FormMessage />
            </FormItem>
          )}

        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Почта:</FormLabel>
              <FormControl>
                <Input placeholder="example@work.com" {...field} />
              </FormControl>
              <FormDescription>

              </FormDescription>

              <FormMessage />
            </FormItem>
          )}

        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль:</FormLabel>
              <FormControl>
                <Input placeholder="Введите пароль" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}

        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтвердите пароль:</FormLabel>
              <FormControl>
                <Input placeholder="Подтвердите пароль" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}

        />

        <Button className="self-center min-w-2/3" type="submit">Зарегистрироваться</Button>
      </form>
    </Form>
  )
}

export function SignInForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSignIpSchema>>({

  })
  async function onSubmit(values: z.infer<typeof formSignIpSchema>) {
    const user = await signIn.email(values)
    console.log(user)
    if (user.error) {
      toast(
        'Ошибка авторизации. Пользователь не найден или данные введены не верно.',
        {
          action: {
            label: 'Понял',
            onClick: () => { console.log('Error toast is closed.') },
          },
        },
      )
    }
    else {
      router.push('/')
    }
  }

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Почта:</FormLabel>
              <FormControl>
                <Input placeholder="example@work.com" {...field} />
              </FormControl>
              <FormDescription>

              </FormDescription>

              <FormMessage />
            </FormItem>
          )}

        />
        <FormField
          control={form.control}
          name="password"

          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль:</FormLabel>
              <FormControl>
                <Input placeholder="Введите пароль" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}

        />

        <Button className="self-center min-w-2/3" type="submit">Войти</Button>
      </form>
    </Form>
  )
}

/* App Forms */

const formTaskSchema = z.object({
  title: z.string().min(3, {
    message: 'Название задачи должно содержать не менее 3 символов.',
  }),
  description: z.string().optional(),
  dueDate: z.string().optional().refine(val => !val || !isNaN(Date.parse(val)), {
    message: 'Введите корректную дату.',
  }),
})

export function TaskForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formTaskSchema>>({
    resolver: zodResolver(formTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
    },
  })

  const [isLoading, setLoading] = useState(false)
  const { toggleDialog } = useDialog()
  const { addTasks } = useTasks()

  async function onSubmit(values: z.infer<typeof formTaskSchema>) {
    let task
    try {
      setLoading(true)
      const response = await fetch('/api/task', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',

        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.log(errorData)
        throw new Error(errorData.error || 'Ошибка создания задачи')
      }
      else {
        task = await response.json()
      }
      setLoading(false)

      toast('Задача успешно создана!', {
        action: {
          label: 'ОК',
          onClick: () => console.log('Task created toast closed.'),
        },
      })
      addTasks([{
        id: task.id,
        title: task.title,
        description: task.description,
        isActive: task.isActive,
        dueDate: task.dueDate,
      }])
      toggleDialog()
    }
    catch (error) {
      setLoading(false)
      toast('Ошибка при создании задачи.', {
        action: {
          label: 'Понял',
          onClick: () => console.log('Error toast closed.'),
        },
      })
      console.error(error)
      toggleDialog()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between gap-4 ">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название задачи:</FormLabel>
              <FormControl>
                <Input placeholder="Введите название задачи" {...field} />
              </FormControl>
              <FormDescription>
                Краткое название вашей задачи.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание:</FormLabel>
              <FormControl>
                <Input placeholder="Введите описание задачи (необязательно)" {...field} />
              </FormControl>
              <FormDescription>
                Подробное описание задачи.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Дата выполнения:</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>
                Укажите дату выполнения задачи (необязательно).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="self-center min-w-2/3 text-white " type="submit" disabled={isLoading}>Создать задачу</Button>
      </form>
    </Form>
  )
}
