adm_notice_data = [
    {"adm_notice_createdAt": "12-12-2020", "auteur": "Jean", "titre": "Nouveau producteur", "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto aut corporis, cum dolores eligendi eum libero mollitia numquam, odit perspiciatis similique, sint. Deleniti expedita fugiat illo nisi temporibus veritatis."},
    {"adm_notice_createdAt": "12-12-2020", "auteur": "Jean", "titre": "Nouveau producteur", "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto aut corporis, cum dolores eligendi eum libero mollitia numquam, odit perspiciatis similique, sint. Deleniti expedita fugiat illo nisi temporibus veritatis."},
    {"adm_notice_createdAt": "12-12-2020", "auteur": "Jean", "titre": "Nouveau producteur", "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto aut corporis, cum dolores eligendi eum libero mollitia numquam, odit perspiciatis similique, sint. Deleniti expedita fugiat illo nisi temporibus veritatis."},
    {"adm_notice_createdAt": "12-12-2020", "auteur": "Jean", "titre": "Nouveau producteur", "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto aut corporis, cum dolores eligendi eum libero mollitia numquam, odit perspiciatis similique, sint. Deleniti expedita fugiat illo nisi temporibus veritatis."},
    {"adm_notice_createdAt": "12-12-2020", "auteur": "Jean", "titre": "Nouveau producteur", "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto aut corporis, cum dolores eligendi eum libero mollitia numquam, odit perspiciatis similique, sint. Deleniti expedita fugiat illo nisi temporibus veritatis."},
    {"adm_notice_createdAt": "12-12-2020", "auteur": "Jean", "titre": "Nouveau producteur", "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto aut corporis, cum dolores eligendi eum libero mollitia numquam, odit perspiciatis similique, sint. Deleniti expedita fugiat illo nisi temporibus veritatis."}
]



$( document ).ready(function() {
    adm_notice_add_row(adm_notice_data);
});

/**
 * Retourne la date now
 * @returns {string} Date format DD-MM-YYYY
 */
function formatDate() {
    let d = new Date(),
        month = '' + (d.getMonth()),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('-');
}

const adm_notice_add_row = (data) => {
    $(`#notice_list`).empty();
    for (const dataKey in data) {
        $('#notice_list').append(`            
            <tr>
                <td>${data[dataKey].titre}</td>
                <td>${data[dataKey].auteur}</td>
                <td class="text-right">
                    <button class="btn text-white btn-primary" onclick="adm_notice_edit(${dataKey})" ><i class="far fa-edit"></i></button>
                    <button class="btn text-white btn-danger" onclick="adm_notice_delete(${dataKey})"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>
        `)
    }
}

const adm_notice_new = () => {
    $('#notice_edit').empty();
    $(`#notice_edit`).append(`    
        <h2 class="h2">Création d'une actulitée</h2>
    
        <form onsubmit="adm_notice_save(event, 'new')" class="container" id="adm_notice_form">
            <div class="form-group">
                <label for="titreActu">Titre</label>
                <input type="text" class="form-control" name="titreActu" id="titreActu" aria-describedby="titreHelp" placeholder="Titre de l'actualité">
                <small id="titreHelp" class="form-text text-muted">Un titre d'actualitée qui attire l'œil.</small>
            </div>
            <div class="form-group">
                <label for="content">Contenu</label>
                <textarea class="form-control" name="content" id="content"></textarea>
            </div>
            <div class="d-flex justify-content-center">
                <button class="btn btn-primary " type="submit">Enregistrer</button>
            </div>
        </form>
    `)
    CKEDITOR.replace( 'content' );
}

const adm_notice_edit = (id) => {
    let actu = adm_notice_data[id]
    $('#notice_edit').empty();
    $(`#notice_edit`).append(`    
        <h2 class="h2">Edition de l'actulitée</h2>
        <p class="h4">${actu.titre} de ${actu.auteur} le ${actu.adm_notice_createdAt}</p>
    
        <form onsubmit="adm_notice_save(event, ${id})" class="container" id="adm_notice_form">
            <div class="form-group">
                <label for="titreActu">Titre</label>
                <input type="text" class="form-control" name="titreActu" id="titreActu" aria-describedby="titreHelp" placeholder="Titre de l'actualité" value="${actu.titre}">
                <small id="titreHelp" class="form-text text-muted">Un titre d'actualitée qui attire l'œil.</small>
            </div>
            <div class="form-group">
                <label for="content">Contenu</label>
                <textarea class="form-control" name="content" id="content">${actu.content}</textarea>
            </div>
            <div class="d-flex justify-content-center">
                <button class="btn btn-primary " type="submit">Enregistrer</button>
            </div>
        </form>
    `)
    CKEDITOR.replace( 'content' );
}

const adm_notice_save = (event, id) => {
    event.preventDefault()
    if (id === 'new') {
        id = adm_notice_data.length + 1
        // adm_notice_data[id].titre = $(`#titreActu`).val()
        // adm_notice_data[id].content = CKEDITOR.instances.content.getData()
        adm_notice_data[id] = {
            "titre": $('#titreActu').val(),
            "adm_notice_createdAt": formatDate(),
            "auteur": "Ben",
            "content": CKEDITOR.instances.content.getData()
        }

    } else {
        adm_notice_data[id].titre = $('#titreActu').val()
        adm_notice_data[id].content = CKEDITOR.instances.content.getData()

        $('#alert').show()
        $('#alert').text('Modification effectuée')
    }
    setTimeout(
        function()
        {
            $('#alert').hide()
        }, 3000);
    $('#notice_edit').empty();
    adm_notice_add_row(adm_notice_data);
}

const adm_notice_delete = (id) => {
    $('#exampleModal').append(`    
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Confirmer la suppression</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Vous confirmer la suppression de l'actualitée n° ${id}
                    <hr>
                    Titre : ${adm_notice_data[id].titre} <br>
                    Auteur : ${adm_notice_data[id].auteur}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="adm_notice_clean_modal()">Annuler</button>
                    <button type="button" class="btn btn-primary" onclick="adm_notice_delete_confirm(${id})">Supprimer</button>
                </div>
            </div>
        </div>
    `)
    $(`#exampleModal`).modal('toggle')
}

const adm_notice_clean_modal = () => {
    $('#exampleModal').empty()
    $(`#exampleModal`).modal('toggle')
}

const adm_notice_delete_confirm = (id) => {
    delete adm_notice_data[id]
    adm_notice_clean_modal()
    adm_notice_add_row(adm_notice_data)
}
