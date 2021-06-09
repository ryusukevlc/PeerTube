import { Component, Input, OnInit } from '@angular/core'
import { AuthService } from '@app/core'
import { VideoFilter, VideoSortField } from '@shared/models'
import { Video, VideoService } from '../../shared-main'
import { MiniatureDisplayOptions } from '../../shared-video-miniature'

/*
 * Markup component list videos depending on criterias
*/

@Component({
  selector: 'my-videos-list-markup',
  templateUrl: 'videos-list-markup.component.html',
  styleUrls: [ 'videos-list-markup.component.scss' ]
})
export class VideosListMarkupComponent implements OnInit {
  @Input() sort: string
  @Input() categoryOneOf: number[]
  @Input() languageOneOf: string[]
  @Input() count: number
  @Input() onlyDisplayTitle: boolean
  @Input() filter: VideoFilter

  videos: Video[]

  displayOptions: MiniatureDisplayOptions = {
    date: false,
    views: true,
    by: true,
    avatar: false,
    privacyLabel: false,
    privacyText: false,
    state: false,
    blacklistInfo: false
  }

  constructor (
    private auth: AuthService,
    private videoService: VideoService
  ) { }

  getUser () {
    return this.auth.getUser()
  }

  ngOnInit () {
    if (this.onlyDisplayTitle) {
      for (const key of Object.keys(this.displayOptions)) {
        this.displayOptions[key] = false
      }
    }

    const options = {
      videoPagination: {
        currentPage: 1,
        itemsPerPage: this.count
      },
      categoryOneOf: this.categoryOneOf,
      languageOneOf: this.languageOneOf,
      filter: this.filter,
      sort: this.sort as VideoSortField
    }

    this.videoService.getVideos(options)
      .subscribe(({ data }) => this.videos = data)
  }
}
