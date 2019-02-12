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

        formData.append('audio', audio);

        return this.httpClient.post(this.api_path + '/stt/', formData);
    }
}
