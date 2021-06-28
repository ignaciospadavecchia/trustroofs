### Sitemap for [Administrators]


    GET / : Get all apartments : index
    GET /:id : Get an apartment detail
    POST / : Add/Create new Apartment
    PATCH /:id : Update Apartment
    DELETE /:id : Delete Apartment


--------------------------------------------------------
 * "Home"               /                        @index
 * "Explore"            /apartments              @index
 * "Host"               /admin                   @index
    => [Administrar]    /admin/apartments        @index
    => [Anadir]         /admin/add-new           @index
    => [Editar]         /admin/apartments/:id    @index
    => [Eliminar]       /admin
 * "Login"              /admin   -- wip          @index
 * "Subscribe"          /register --wip          @index

