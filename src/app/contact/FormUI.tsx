"use client";

import React from 'react'
import BaseLayout from '../../components/BaseLayout'
// import {useSendMessageMutation} from '../../services/frontendAPI'
import {MobileOutlined, WhatsAppOutlined} from '@ant-design/icons'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import openNotification from '../../components/Notification';
import Banner from '../constants/Banner';

import { Spin } from 'antd';


const FormUI = () => {
    // const [sendMessage] = useSendMessageMutation();

    return (
        <div className="flex flex-col lg:p-20 p-10 xs:pt-0 sm:pt-0 lg:px-[300px]">
            <h1 className="text-[32px] font-semibold font-[ubuntu]">Or fill out this form, we'll<br/> quickly get back to you</h1>
            <Formik
                initialValues={{ name: '', email: '', subject: '', message: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    let msg = '';

                    try {
                        await sendMessage(values);
                        msg = 'Message sent successfully';
                    } catch (err) {
                        msg = 'Failed to send message: ' + err.message;
                    }
                    openNotification(msg);
                    setTimeout(() => {
                        setSubmitting(false);
                    }, 5000);
                }}
            >
                {({ isSubmitting }) => (
                    <Spin spinning={isSubmitting} delay={500}>
                        <Form className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-8 mt-10 bg-[#F2F9EF] lg:px-[120px] px-10 py-[50px] rounded-[10px]">
                            <div className="flex flex-col">
                                <label>Name</label>
                                <Field type="text" name="name" placeholder="Full Name" className="border border-[#D0D0D0] px-5 h-[50px] rounded-[5px] mt-3" />
                                <ErrorMessage name="name" component="span" />
                            </div>
                            <div className="flex flex-col">
                                <label>Email</label>
                                <Field type="email" name="email" placeholder="Enter email address" className="border border-[#D0D0D0] px-5 h-[50px] rounded-[5px] mt-3" />
                                <ErrorMessage name="email" component="span" />
                            </div>
                            <div className="md:col-span-2 lg:col-span-2 flex flex-col">
                                <label>Subject</label>
                                <Field type="text" name="subject" placeholder="Type your message title here" className="border border-[#D0D0D0] px-5 h-[50px] rounded-[5px] mt-3" />
                                <ErrorMessage name="subject" component="span" />
                            </div>
                            <div className="md:col-span-2 lg:col-span-2 flex flex-col">
                                <label>Message</label>
                                <Field as="textarea" name="message" placeholder="Type your message here" rows={10} className="border border-[#D0D0D0] px-5 py-5 rounded-[5px] mt-3" />
                                <ErrorMessage name="message" component="span" />
                            </div>
                            <button type="submit" className="bg-[#4A9A71] w-40 py-3 rounded-[5px] text-[16px] text-white" disabled={isSubmitting}>Submit</button>
                        </Form>
                    </Spin>
                )}
            </Formik>
        </div>
    );
};

export default FormUI;
