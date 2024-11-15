package rest;

import com.google.gson.Gson;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import java.sql.SQLException;
import org.utl.dsm.zarape.controller.ControllerSucursal;
import org.utl.dsm.zarape.model.Sucursal;

@Path("sucursal")
public class restSucursal extends Application {
    @Path("getall")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        String out = "";
        try {
            ControllerSucursal cp = new ControllerSucursal();
            List<Sucursal> sucursales = cp.getAll();
            Gson gs = new Gson();
            out = gs.toJson(sucursales);
        } catch (Exception ex) {
            out = "{\"error\":\"" + ex.toString() + "\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("test")
@GET
@Produces(MediaType.TEXT_PLAIN)
public Response test() {
    return Response.ok("API is working").build();
}
}



