export class ResponseDto<T>{
    result!: T;
    errorMessage?: string | undefined; 
}