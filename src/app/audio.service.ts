import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

interface ScriptResponse {
    script: string;
}

@Injectable({
    providedIn: 'root'
})
export class AudioService {

    constructor(private httpClient: HttpClient) {}

    public uploadFile(audio: File): Observable<any> {
        const formData = new FormData();

        formData.append('audio', audio);

        return this.httpClient.post('https://backend.hoodpub.com/stt/', formData);
        // return this.httpClient.post('http://localhost:9000/stt/', formData);
    }
}
