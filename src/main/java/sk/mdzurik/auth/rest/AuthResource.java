package sk.mdzurik.auth.rest;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author mdzurik
 */
@Path("/auth")
public class AuthResource {

    @Context
    private HttpServletRequest httpRequest;

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public LoginResponse login(LoginRequest request) {
        LoginResponse response = new LoginResponse();

        if (httpRequest.getUserPrincipal() == null) {
            try {
                httpRequest.login(request.getLogin(), request.getPassword());
                response.setSuccess(true);
            } catch (ServletException ex) {
                response.setSuccess(false);
            }
        } else {
            response.setSuccess(false);
        }

        return response;
    }

}
