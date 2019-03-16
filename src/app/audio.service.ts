import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { environment } from './../environments/environment';


interface ScriptResponse {
    script: string;
}

@Injectable({
    providedIn: 'root'
})
export class AudioService {
    api_path = environment.api_path;
    constructor(private httpClient: HttpClient) {}

    public uploadFile(presigned_post: any, audio: File): Observable<any> {
        console.log(typeof(presigned_post));

        if (audio) {
            presigned_post.audio = audio;
        }

        const formData = new FormData();
        formData.append('AWSAccessKeyId', presigned_post['fields']['AWSAccessKeyId']);
        formData.append('key', presigned_post['fields']['key']);
        formData.append('policy', presigned_post['fields']['policy']);
        formData.append('signature', presigned_post['fields']['signature']);

        // no x-amz-security-token in local env
        if (presigned_post['fields'].hasOwnProperty('x-amz-security-token')) {
            formData.append('x-amz-security-token', presigned_post['fields']['x-amz-security-token']);
        }
        formData.append('file', audio, audio.name);

        console.log('presigned_post ', formData);


        return this.httpClient.post(presigned_post['url'], formData);
    }

    public transcribe(id: string, key: string, filename: string, to_info: any): Observable<any> {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('key', key);
        formData.append('email', to_info['email']);
        formData.append('lang_code', to_info['lang_code']);

        const url = this.api_path + '/stt/';
        return this.httpClient.post(url, formData);
    }

    public get_stt(id: string): Observable<any> {
        const url = this.api_path + '/stt/' + id + '/';
        return this.httpClient.get(url);
    }

    public notify(id: string, data: any): Observable<any> {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('language', data.language);

        const url = this.api_path + '/stt/' + id + '/notify/';
        return this.httpClient.patch(url, formData);
    }

    public presigned_post(filename: string): Observable<any> {
        console.log('presigned_post is called', filename);
        const params = new HttpParams().set('filename', filename);

        const url = this.api_path + '/stt/get_presigned_post/';

        console.log(url, params);

        return this.httpClient.get(url, { params: params });
    }
}
