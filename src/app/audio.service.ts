import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

    public uploadFile(audio: File): Observable<any> {
        const formData = new FormData();

        if (audio) {
            formData.append('audio', audio);
        }

        return this.httpClient.post(this.api_path + '/stt/', formData);
    }

    public transcribe(id: string): Observable<any> {
        const url = this.api_path + '/stt/' + id + '/transcribe/';
        return this.httpClient.patch(url, '');
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
}
