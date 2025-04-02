import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'License Agreement | ShipFastStarter',
  description: 'Software license agreement for the ShipFastStarter Next.js SaaS kit.',
}

export default function LicensePage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary dark:text-white sm:text-4xl">
          License Agreement
        </h1>
        <p className="mt-4 text-base text-text-secondary">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="mt-12 space-y-8 text-base leading-7 text-text-secondary">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">1. License Grant</h2>
            <p>
              Subject to the terms of this License Agreement, ShipFastStarter ("Licensor") grants you ("Licensee") a non-exclusive, worldwide, perpetual license to use the ShipFastStarter Next.js SaaS kit ("Software") for the purpose of creating and deploying web applications.
            </p>
            <p>
              This license is for a single Licensee (individual or entity). Each individual or entity that wishes to use the Software must purchase a separate license.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">2. Standard License Rights</h2>
            <p>
              The Standard License grants you the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Software to create unlimited end products for yourself or for clients</li>
              <li>Use the Software to create end products where the end product is a website, web application, or internet service that you or your client will be the end-user</li>
              <li>Modify the Software to create derivative works that include the Software as a basis</li>
              <li>Use the Software for commercial purposes</li>
              <li>Apply bug fixes, updates, and security patches to the Software</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">3. License Restrictions</h2>
            <p>
              The License does not grant you the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Redistribute, resell, lease, license, sub-license, or offer the Software to any third party</li>
              <li>Use the Software to create derivative works that offer similar functionality as the Software, or would compete with the Software in any way</li>
              <li>Include the Software in an application that is designed to create a website builder or a "no-code/low-code platform"</li>
              <li>Use the Software in any way that breaks applicable laws or regulations</li>
              <li>Remove any copyright or proprietary notices from the Software</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">4. Extended License</h2>
            <p>
              For users who require additional rights beyond the Standard License, an Extended License is available for purchase. The Extended License includes all rights granted by the Standard License, plus:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to create a single SaaS (Software as a Service) application where multiple users can create accounts and build their own projects</li>
              <li>Priority support and assistance with implementation</li>
              <li>Extended updates and maintenance</li>
            </ul>
            <p>
              Please contact us at license@shipfaststarter.com for pricing and details on the Extended License.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">5. Intellectual Property Rights</h2>
            <p>
              The Software, including but not limited to all code, design, documentation, and content, is owned by the Licensor and is protected by copyright and other intellectual property laws. All rights not expressly granted to you under this License Agreement are reserved by the Licensor.
            </p>
            <p>
              Third-party components included in the Software are licensed under their respective open-source licenses. A list of these components and their licenses is included in the documentation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">6. Updates and Support</h2>
            <p>
              The Licensor may, at its discretion, provide updates, bug fixes, or new versions of the Software. The terms of this License Agreement will apply to all such updates provided by the Licensor.
            </p>
            <p>
              Technical support is provided according to the support plan included with your purchase. Standard support includes access to documentation, tutorials, and community forums. Premium support plans may include additional services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">7. Warranty Disclaimer</h2>
            <p>
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">8. Limitation of Liability</h2>
            <p>
              IN NO EVENT SHALL THE LICENSOR BE LIABLE FOR ANY SPECIAL, INCIDENTAL, INDIRECT, OR CONSEQUENTIAL DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF BUSINESS PROFITS, BUSINESS INTERRUPTION, LOSS OF BUSINESS INFORMATION, OR ANY OTHER PECUNIARY LOSS) ARISING OUT OF THE USE OF OR INABILITY TO USE THE SOFTWARE, EVEN IF THE LICENSOR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">9. Term and Termination</h2>
            <p>
              This License Agreement is effective until terminated. The Licensor reserves the right to terminate your license if you fail to comply with any term of this License Agreement. Upon termination, you must cease all use of the Software and destroy all copies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">10. Export Regulations</h2>
            <p>
              The Software may be subject to export laws and regulations. You agree to comply with all applicable international and national laws that apply to the Software.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">11. Governing Law</h2>
            <p>
              This License Agreement shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without giving effect to any principles of conflicts of law.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">12. Contact Information</h2>
            <p>
              If you have any questions about this License Agreement, please contact us at:
            </p>
            <p className="font-medium">
              Email: license@shipfaststarter.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
