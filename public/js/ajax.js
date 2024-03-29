function myFavourite(id){
    $_token = "{{ csrf_token() }}";
    let index = 1;
    $.ajax({
        headers: {'X-CSRF-Token': $('meta[name=_token]').attr('content')},
        url: `{{url('admin/ghi-chu/favourite')}}`,
        type: 'GET',
        cache: false,
        data: {'id':id,'_token': $_token}, //see the $_token
        success: function (response) {
            var response = JSON.parse(response);
            console.log(response);
            $('.note-container').empty();
            response.forEach(element => {

                let ele_id = element['id'];
                let d = new Date(element['created_at']);
                let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
                let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
                let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
                let favourite = element['favourite'];
                $('.note-container').append(`
        <div class="note-item ${favourite == 1 ? 'note-fav': ''} all-notes ${element['status'] == 1 ? 'note-personal' : element['status'] == 2 ? 'note-work' : element['status'] ==3 ? 'note-social' : element['status'] ==4? 'note-important': ''}">
            <div class="note-inner-content">
                <div class="note-content">
                    <p class="note-title" data-noteTitle="Meeting with Kelly">${element['title']}</p>
                    <p class="meta-time">${da}/${mo}/${ye}</p>
                    <div class="note-description-content">
                        <p class="note-description" data-noteDescription="Curabitur facilisis vel elit sed dapibus sodales purus rhoncus.">${element['short']}</p>
                    </div>
                </div>
                <div class="note-action">
                    <svg xmlns="http://www.w3.org/2000/svg" onclick="myFavourite(${ele_id})" idth="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fav-note"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 delete-note"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </div>
                <div class="note-footer">
                    <div class="tags-selector btn-group">
                        <a class="nav-link dropdown-toggle d-icon label-group" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true">
                            <div class="tags">
                                <div class="g-dot-personal"></div>
                                <div class="g-dot-work"></div>
                                <div class="g-dot-social"></div>
                                <div class="g-dot-important"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </div>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right d-icon-menu">
                            <a class="note-personal label-group-item label-personal dropdown-item position-relative g-dot-personal" href="javascript:void(0);"> Cá nhân</a>
                            <a class="note-work label-group-item label-work dropdown-item position-relative g-dot-work" href="javascript:void(0);"> Công việc</a>
                            <a class="note-social label-group-item label-social dropdown-item position-relative g-dot-social" href="javascript:void(0);"> Xã hội</a>
                            <a class="note-important label-group-item label-important dropdown-item position-relative g-dot-important" href="javascript:void(0);"> Quan trọng</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
`);
            });

        }
    });
}
