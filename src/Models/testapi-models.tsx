export interface ReqParameter {
    k: string;
    v: string;
}

export interface DataTestApiObject {
    function_id: string;
    app_user: string;
    app_password: string;
    req_transaction_id: string;
    state_name: string;
    req_parameters: ReqParameter[];
    extra_xml: string;
}