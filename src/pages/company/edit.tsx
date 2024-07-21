import { Edit, useForm, useModalForm, useSelect } from "@refinedev/antd";
import type {
  GetFieldsFromList,
} from "@refinedev/nestjs-query";

import { Form, Input, InputNumber, Modal, Select } from "antd";

import { USERS_SELECT_QUERY } from "@/graphql/queries";
import type {
  UsersSelectQuery,
} from "@/graphql/types";
import {UPDATE_COMPANY_MUTATION } from "@/graphql/mutations";
import SelectOptionWithAvatar from "@/components/select-option-with-avatar";
import CustomAvatar from "@/components/custom-avatar";
import { getNameInitials } from "@/utilities";
import { Col, Row } from "antd/lib";
import { businessTypeOptions, companySizeOptions, industryOptions } from "@/constants";
import { CompanyContactsTable } from "./contacts-table";



const EditPage = () => {
    const {saveButtonProps,formProps,formLoading,queryResult}=useForm({
        redirect:false,
        meta:({
            gqlMutation:UPDATE_COMPANY_MUTATION
        })
    });
    const {avatarUrl,name}=queryResult?.data?. data || {};
    const {selectProps,queryResult:queryResultUsers}=useSelect<GetFieldsFromList<UsersSelectQuery>>({
        resource:'users',
        optionLabel:'name',
        pagination:{
            mode:'off',
        },
        meta:{ 
            gqlQuery:USERS_SELECT_QUERY
        }
    })

  return (
    <div>
        <Row gutter={[32,32]}>
            <Col xs={24} xl={12}>
                <Edit
                    isLoading={formLoading}
                    saveButtonProps={saveButtonProps}
                    breadcrumb={false}
                >
                    <Form {...formProps} layout='vertical'>
                        <CustomAvatar shape="square" src={avatarUrl} name=
                        {getNameInitials(name || '')} style={{width:96,height:96,
                        marginBottom:'24px'}}/>
                        <Form.Item
                            label='Sales Owner'
                            name='salesOwnerId'
                            initialValue={formProps?.initialValues?.salesOwner?.id}
                        >
                            <Select
                                placeholder="Please select a sales owner"
                                {...selectProps}
                                options={
                                    queryResultUsers.data?.data.map((user)=>({
                                        value:user.id,
                                        label:(
                                            <SelectOptionWithAvatar
                                                name={user.name}
                                                avatarUrl={user.avatarUrl ?? undefined}
                                            />
                                        )
                                    })) ?? []
                                }
                            />
                            </Form.Item>
                            <Form.Item label="Company size" name="companySize">
                            <Select options={companySizeOptions} />
                            </Form.Item>
                            <Form.Item label="Total revenue" name="totalRevenue">
                            <InputNumber
                                autoFocus
                                addonBefore={"$"}
                                min={0}
                                placeholder="0,00"
                                formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }
                            />
                            </Form.Item>
                            <Form.Item label="Industry" name="industry">
                            <Select options={industryOptions} />
                            </Form.Item>
                            <Form.Item label="Business type" name="businessType">
                            <Select options={businessTypeOptions} />
                            </Form.Item>
                            <Form.Item label="Country" name="country">
                            <Input placeholder="Country" />
                            </Form.Item>
                            <Form.Item label="Website" name="website">
                            <Input placeholder="Website" />
                            </Form.Item>
                    </Form>
                </Edit>
            </Col>
            <Col xs={24} xl={12} style={{marginTop:'4px'}}>
               <CompanyContactsTable/>
            </Col>
        </Row>
    </div>
  )
}

export default EditPage