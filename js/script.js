AOS.init();

$('#search-button').on('click', function() {

    $('.info').removeClass('col-md-10').addClass('col-md-12')
    $('.info').addClass('text-center')
    $('.info').html(`
            <img src="img/Loading.gif" alt="Loading gif" width="150" class="mt-5 img-fluid ">
    `);
    
    $.ajax({
        url: 'https://api.binderbyte.com/v1/track',
        type: 'GET',
        dataType: 'json',
        data: {
            'api_key' : '55c9b547eabef7ce959e9f7c2db425421bf0ed994ceb20d3970523fe603b568d',
            'courier' : $('.kurir option:selected').val(),
            'awb' : $('#search-input').val()
        }, 
        statusCode: {
            200 : function(result) {
                const jasa = $('.kurir option:selected').text();
                let summary = result.data.summary;
                let detail = result.data.detail;
                let history = result.data.history.reverse();
                let tanggalKirim = history[0].date;

                $('.info').removeClass('text-center').removeClass('padL-R')
                $('.info').html(`
                    <div data-aos="zoom-in-down">
                    <div class="card br-box">
                        <div class="card">
                            <h5 class="card-header br-top text-white">Informasi Pengiriman</h5>
                            <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">No. Resi</th>
                                <th scope="col">Status</th>
                                <th scope="col">Service</th>
                                <th scope="col">Tanggal Pengiriman</th>
                                <th scope="col">Pengirim</th>
                                <th scope="col">Penerima</th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                <tr>
                                <td>${summary.awb}</td>
                                <td>${summary.status}</td>
                                <td>${summary.service}</td>
                                <td>${tanggalKirim}</td>
                                <td>${detail.shipper} <br> ${detail.origin}</td>
                                <td>${detail.receiver} <br> ${detail.destination}</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                   

                    <br>
                    <h4 class="mb-2">II. Status Pengiriman</h4>
                    <table class="table">
                        <thead>
                            <tr class="text-center">
                                <th>Tanggal</th>
                                <th>Keterangan</th>
                            </tr>
                        </thead>
                        <tbody class="history">
                            
                        </tbody>
                    </table>
                    </div>
                `);

                $.each(history, function(i, data) { 
                    $('.history').append(`
                        <tr>
                            <td>${data.date}</td>
                            <td>${data.desc}</td>
                        </tr>
                    `);

                    $('#search-input').val('');
                });
            },
            400 : function(result) {

                $('.info').removeClass('col-md-12').addClass('padL-R')
                if( result.responseJSON.message == "Parameters `courier` and `awb` is required" ) {
                    $('.info').html(`
                    <div class="alert alert-danger" role="alert">
                        Harap masukkan <strong>nomor resi</strong> !
                    </div>
                    `);
                } else {
                    $('.info').removeClass('col-md-12').addClass('padL-R')
                    $('.info').html(`
                        <div class="alert alert-danger time-out" role="alert">
                            Nomor resi tidak ada, mohon periksa lagi nomor resi / jasa pengiriman yang dipilih !
                        </div>
                    `);
                }
                // console.log(result.responseJSON.message);
            },
            500 : function() {
                $('.info').removeClass('col-md-12').addClass('col-md-8').removeClass('text-center')
                $('.info').html(`
                    <div class="alert alert-danger time-out" role="alert">
                        Nomor resi tidak ada, mohon periksa lagi nomor resi / jasa pengiriman yang dipilih !
                    </div>
                `);
            }

        }
    }); 
});

