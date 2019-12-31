class Test {
    constructor(name, email) {
      this.name = name;
      this.email = email;
    }
  }
  
  module.exports = Test;
  
  /**
   * @swagger
   *  components:
   *    schemas:
   *      Test:
   *        type: object
   *        required:
   *          - name
   *          - email
   *        properties:
   *          name:
   *            type: string
   *          email:
   *            type: string
   *            format: email
   *            description: Email for the Test, needs to be unique.
   *        example:
   *           name: Alexander
   *           email: fake@email.com
   */